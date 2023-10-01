import style from "@/styles/Layout.module.css"

export default function ({children}) {
    return (
        <div className={style.conteiner}>

            <main className={style.main}>
                {children}
            </main>
            
        </div>
    )
}