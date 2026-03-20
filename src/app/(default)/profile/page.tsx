import styles from "../../../components/button/button.module.css";

export default function Profile() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Profile</h1>
            <form action="/auth/signout" method="post">
                <button className={`${styles.button} ${styles.edit}`} type="submit">Sign out</button>
            </form>
        </div>
    )
}