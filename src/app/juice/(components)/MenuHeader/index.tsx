import styles from './styles.module.scss';

export default function MenuHeader() {
    return (
        <div className={styles.header}>
            <div className={styles.firstColumn}>
                <h1 className={styles.pageTitle}>Juice Hub</h1>
                <div className={styles.options}>
                    <a href=''>Home</a>
                    <a href=''>Sobre nós</a>
                    <a href=''>Contato</a>
                </div>
            </div>
            <div className={styles.secondColumn}>
                <a href=''>Log in</a>
                <a href='' className={styles.signUpButton}>Sign Up</a>
            </div>
        </div>
    );
}
