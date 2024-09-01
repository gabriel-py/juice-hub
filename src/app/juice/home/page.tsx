import styles from './styles.module.scss';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Home() {
    return (
        <div className={styles.content}>
            <div className={styles.bannerDescription}>
                <span>Faça o primeiro pedido de graça!</span>
                <h1 className={styles.bannerDescriptionTitle}>O seu suco com o menor preço e mais sabor!</h1>
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
    );
}
