import style from "@/styles/Layout.module.css"
import Header from "../Components/header"


export default function Layout({ children }) {
    return (
        <div className={style.conteiner}>
            <Header></Header>
            <main className={style.mains}>
                {children}
            </main>
        </div>
    )
}