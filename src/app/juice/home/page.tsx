import styles from './styles.module.scss';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Home() {
    return (
        <div className={styles.screen}>
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
            <div className={styles.content}>
                <div className={styles.bannerDescription}>
                    <span>Faça o primeiro pedido de graça!</span>
                    <h1 className={styles.bannerDescriptionTitle}>O melhor jeito de comprar sucos online, com o menor preço e mais sabor!</h1>
                    <span>Juice Hub é a primeira loja de sucos online. Um e-juice.</span>
                    <a href='' className={styles.startButton}>Fazer seu pedido <ArrowForwardIcon /></a>
                </div>
                <div className={styles.bannerImage}>
                    <img
                        className={styles.img}
                        src={`/banner.jpg`}
                    />
                </div>
            </div>
        </div>
    );
}
