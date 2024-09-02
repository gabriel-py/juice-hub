import styles from './styles.module.scss';

interface IProgressBar {
  progress: number;
}

const ProgressBar = ({ progress }: IProgressBar) => {
  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progress}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
