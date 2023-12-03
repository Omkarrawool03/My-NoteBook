import React ,{useContext, useEffect , useRef  , useState} from 'react'
import noteContext from '../Context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'



const Notes = (props) => {


  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes , getNotes , editNote } = context;
   useEffect(() =>{
    if (localStorage.getItem('token')) {
      getNotes()
      
    }
    else{
 navigate("/login");
    }
  }, [])
  
  const ref = useRef(null)
  const refClose = useRef(null)

  const [note , setNote] = useState({id: "" , etitle:"",edescription:"",etag:"Default"})
  
const updateNote = (currentNote) =>{
  ref.current.click();
  setNote({ id : currentNote._id , etitle:currentNote.title , edescription:currentNote.description, etag:currentNote.tag})
}



const handleClick = (e)=>{
  e.preventDefault();
  editNote(note.id, note.etitle , note.edescription , note.etag)
  refClose.current.click();
  props.showAlert("Updated SuccesFully" , "success")
}


const onchange = (e)=>{
  setNote({...note, [e.target.name]: e.target.value})
}



  return (
    <>
    <AddNote showAlert={props.showAlert}/>
<button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close"   data-bs-dismiss='modal' aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {/* form */}
      <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="desc" className="form-label">description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" minLength={5} required value={note.edescription} onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input type="text" className="form-control" id="etag" name="etag" minLength={5} required value={note.etag} onChange={onchange}/>
  </div>
</form>
{/* form */}
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss='modal'>Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" data-bs-dismiss='modal' className="btn btn-primary">Update Notes</button>
      </div>
    </div>
  </div>
</div>
<div className="container row my-3">
       <h1>Your Note</h1>
       <div className="container mx-1">
       {notes.length===0 && 'No Notes To Display'}
       </div>
       {notes.map((note)=>{
        return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
       })}
    </div>
    </>
  )
}

export default Notes
