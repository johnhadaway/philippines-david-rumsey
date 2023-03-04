from keras.applications.vgg16 import VGG16, preprocess_input
from keras.models import Model
import numpy as np
from PIL import Image
from sklearn.manifold import TSNE
import shutil
import os
import json

model = VGG16(weights='imagenet', include_top=False)
model = Model(inputs=model.input, outputs=model.layers[-1].output)


def load_images(image_folder_path):
    images = []
    for filename in os.listdir(image_folder_path):
        if filename.endswith(".jpg"):
            image_path = os.path.join(image_folder_path, filename)
            image = Image.open(image_path)
            image = image.resize((224, 224))
            images.append(image)
    return images


def generate_embeddings(images):
    image_embeddings = []
    for image in images:
        image = image.resize((224, 224))
        image = np.array(image)
        image = preprocess_input(image)

        embedding = model.predict(np.array([image]))
        image_embeddings.append(embedding.flatten())

    return image_embeddings


def generate_tsne_embeddings(image_embeddings):
    image_embeddings = np.array(image_embeddings)
    tsne = TSNE(n_components=2, verbose=1, perplexity=40, n_iter=300)
    tsne_results = tsne.fit_transform(image_embeddings)
    return tsne_results


def save_tsne_embeddings(output_folder_path, images, image_embeddings_2d, image_folder_path):
    if os.path.exists(output_folder_path):
        shutil.rmtree(output_folder_path)
    os.makedirs(output_folder_path)

    images_folder_path = os.path.join(output_folder_path, "images")
    os.makedirs(images_folder_path)

    image_paths = []
    for i in range(len(images)):
        image_path = os.path.join(
            image_folder_path, os.listdir(image_folder_path)[i])
        if image_path.endswith(".jpg"):
            image_filename = os.path.basename(image_path)
            output_image_path = os.path.join(
                images_folder_path, image_filename)
            shutil.copy(image_path, output_image_path)
            image_paths.append(image_filename)
        else:
            image_paths.append("")

    dataset = []
    for i in range(len(images)):
        if image_paths[i] == "":
            continue

        dataset.append({
            "embedding": image_embeddings_2d[i].tolist(),
            "image_path": image_paths[i]
        })

    with open(os.path.join(output_folder_path, "dataset.json"), "w") as f:
        json.dump(dataset, f, separators=(',', ':'))


if __name__ == "__main__":
    images = load_images(
        image_folder_path="./data/philippines-group-david-rumsey/")
    print(len(images))
    image_embeddings = generate_embeddings(images=images)
    print(len(image_embeddings))
    image_embeddings_2d = generate_tsne_embeddings(
        image_embeddings=image_embeddings)
    print(len(image_embeddings_2d))
    save_tsne_embeddings(
        output_folder_path="output",
        images=images,
        image_embeddings_2d=image_embeddings_2d,
        image_folder_path="./data/philippines-group-david-rumsey/")
