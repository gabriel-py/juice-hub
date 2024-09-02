'use client'
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import BasicData from './steps/basicData';

export interface NewOrderFormData {
    name: string;
    email: string;
    phone_number: string;
    takeOutLocal: number;
    flavors: number[];
}

export default function Order() {
    const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm<NewOrderFormData>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            phone_number: '',
            takeOutLocal: 0,
            flavors: [],
        },
    });


    return (
        <div className={styles.content}>
            <h1 className={styles.pageTitle}>Faça seu pedido</h1>
            <h2>Passo 1 de 3</h2>
            <div className={styles.form}>
                <form>
                    <BasicData control={control} />
                </form>
            </div>
        </div>
    );
}
