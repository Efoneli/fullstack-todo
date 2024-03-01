import React, { Fragment, useState } from "react";

interface Todo {
  todo_id: number;
  description: string;
  text?: string;
}

interface EditTodoProps {
  todo: Todo;
}

const EditTodo: React.FC<EditTodoProps> = ({ todo }) => {
  const [description, setDescription] = useState<string>(todo.description);

  const updateDescription = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location.href = "/";
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred.");
      }    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        Edit
      </button>

      {/* id = id10 */}
      <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;










// import React, { Fragment, useState } from "react";

// interface Todo {
//   id: number
//   text: string
//   description: string
// }

// interface TodoProps {
//   todo: Todo[]
// }

// const EditTodo: React.FC<TodoProps> = ({ todo }) => {
//   const [description, setDescription] = useState<string>(todo.description);

//   const updateDescription = async (e) => {
//     e.preventDefault();
//     try {
//       const body = { description };
//       const response = await fetch(
//         `http://localhost:5000/todos/${todo.todo_id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(body),
//         }
//       );

// window.location = "/"
//     } catch (err) {
//       console.error(err.message);
//     }
//   };
//   return (
//     <Fragment>
//       <button
//         type="button"
//         className="btn btn-warning"
//         data-toggle="modal"
//         data-target={`#id${todo.todo_id}`}
//         onClick={() => setDescription(todo.description)}
//       >
//         Edit
//       </button>

//       {/* id = id10 */}
//       <div className="modal" id={`id${todo.todo_id}`}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h4 className="modal-title">Edit Todo</h4>
//               <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>
//                 &times;
//               </button>
//             </div>

//             <div className="modal-body">
//               <input
//                 type="text"
//                 className="form-control"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-warning"
//                 data-dismiss="modal"
//                 onClick={(e) => updateDescription(e)}
//               >
//                 Edit
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 data-dismiss="modal"
//                 onClick={() => setDescription(todo.description)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default EditTodo;
