import { useState } from "react";
import { Comment } from "./components/Comment";
import { CommentForm } from "./components/CommentForm";

function App() {
  const [comments, setComments] = useState([]);
  return (
    <div className="App">
      <header>
        <h1>ADD COMMENTS</h1>
      </header>
      <main className="container">
        <CommentForm setComments={setComments} />
        <div className="comments">
          {comments.map((comment) => {
            return <Comment comment={comment} />;
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
