const CommentFormOverlay = ({ selectedData, comment, setComment, handleSubmit }) => (
  selectedData !== null && (
    <div className="overlay">
      <form onSubmit={handleSubmit}>
        <h3>Leave a comment</h3>
        <label htmlFor="comment">Comment:</label>
        <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
);

export default CommentFormOverlay;