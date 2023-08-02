import React,{FormEvent, useState} from 'react';
import axios from 'axios';


const UploadImage = ():JSX.Element => {
    const [movie,setMovie] = useState('');
    const [cover,setCover] = useState<File | null>(null);

    const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.files && e.target.files.length > 0) {
            setCover(e.target.files[0]);
          }
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',movie);
        if(cover !== null){
            formData.append('image',cover);
        }
        try {
            const response = await axios.post('http://localhost:6700/upload',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            
            });
            if(response.status === 200){
                console.log(response.data);
                setMovie('');
                setCover(null);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="uploadform">
            <h3>Add info</h3>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="movie">Movie</label>
                <input type="text" onChange={(e)=>{setMovie(e.target.value)}} />
                <label htmlFor="image">Movie cover</label>
                <input type="file" onChange={handleFileChange} />
                <button>Add movie</button>
            </form>
        </div>
    );
}
 
export default UploadImage;