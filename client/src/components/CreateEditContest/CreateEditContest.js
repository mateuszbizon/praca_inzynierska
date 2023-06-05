import React, { useState } from 'react'
import "./create-edit-contest.css"

function CreateEditContest({headingText}) {
    const [form, setForm] = useState({ name: "", startRegistration: "", endRegistration: "", startContest: "", endContest: "", typeContest: "default", city: "" })

    function onChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

  return (
    <section className='create-edit-contest'>
        <div className='create-edit-contest__form-container'>
            <h1 className='create-edit-contest__heading'>{headingText}</h1>
            <form onSubmit={handleSubmit}>
                <div className='create-edit-contest__box'>
                    <input id="name" type='text' name="name" value={form.name} onChange={onChange} required/>
                    <label htmlFor='name'>Nazwa</label>
                    <p className="create-edit-contest__text-error" >
                        error
                    </p>
                </div>
                <div className='create-edit-contest__box'>
                    <input id="startRegistration" type='text' name="startRegistration" value={form.startRegistration} onChange={onChange} onFocus={(e) => (e.target.type = "datetime-local")} onBlur={(e) => (e.target.type = "text")} required/>
                    <label htmlFor='startRegistration'>Początek rejestracji</label>
                    <p className="create-edit-contest__text-error" >
                        error
                    </p>
                </div>
                <div className='create-edit-contest__box'>
                    <input id="endRegistration" type='text' name="endRegistration" value={form.endRegistration} onChange={onChange} onFocus={(e) => (e.target.type = "datetime-local")} onBlur={(e) => (e.target.type = "text")} required/>
                    <label htmlFor='endRegistration'>Koniec rejestracji</label>
                    <p className="create-edit-contest__text-error" >
                        error
                    </p>
                </div>
                <div className='create-edit-contest__box'>
                    <input id="startContest" type='text' name="startContest" value={form.startContest} onChange={onChange} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} required/>
                    <label htmlFor='startContest'>Początek zawodów</label>
                    <p className="create-edit-contest__text-error" >
                        error
                    </p>
                </div>
                <div className='create-edit-contest__box'>
                    <input id="endContest" type='text' name="endContest" value={form.endContest} onChange={onChange} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} required/>
                    <label htmlFor='endContest'>Koniec zawodów</label>
                    <p className="create-edit-contest__text-error" >
                        error
                    </p>
                </div>
                <div className='create-edit-contest__box'>
                    <select name="typeContest" value={form.typeContest} onChange={onChange}>
                        <option value="default" disabled>Wybierz rodzaj zawodów</option>
                        <option value="online">on-line</option>
                        <option value="stationary">stacjonarnie</option>
                    </select>
                    <p className="create-edit-contest__text-error" >
                        error
                    </p>
                </div>
                {form.typeContest === "stationary" && (
                    <div className='create-edit-contest__box'>
                        <input id="city" type='text' name="city" value={form.city} onChange={onChange} required/>
                        <label htmlFor='city'>Miasto</label>
                        <p className="create-edit-contest__text-error" >
                            error
                        </p>
                    </div>
                )}
                <div className='create-edit-contest__btn-box'>
                    <button type='submit' className='create-edit-contest__submit-btn'>
                        {headingText}
                    </button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default CreateEditContest