

interface inputProps {
    className?: string,
    type: "text" | "number",
    placeholder: string,
    register?: {},
    label: string,
    errorMsg?:string,
    list?:string
    
    
    
}

export const Input = ({ list, errorMsg, label, className, type, placeholder, register}:inputProps) => {
    return <div>
        <label htmlFor={label}>{label}</label>
        {
            type === "text"?
            
            <input className={className??""} type={type} {...register} placeholder={placeholder} list={list}/> 
            
            
            :<input className={className??""} type={type} {...register} placeholder={placeholder}/>
        }
        {errorMsg ? 
        
                <span className={className}>{errorMsg}</span>
                : <span className={className}></span> }
    
    </div>
}