import styles from './styles.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Received() {
    return (
        <div className={styles.content}>
            <h1>Pedido recebido com sucesso!</h1>
            <CheckCircleIcon style={{ fontSize: "180px", color: "green" }} />
            <span>Agora é com a gente! Estamos processando seu pedido e você receberá mais instruções em breve.</span>
        </div>
    );
}
