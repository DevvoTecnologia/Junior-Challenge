import { motion } from "framer-motion"


export const Fade = (props:any) =>{
    return(
        <motion.div 
        {...props}
        className={props.className}
       initial={{ opacity: 0, scale: 0.5 }}
       animate={{ opacity: 1, scale: 1 }}
       transition={{ duration: 0.5 }}>
            {props.children}
       </motion.div>
    )
}