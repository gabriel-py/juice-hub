'use client'
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import BasicData from './steps/basicData';
import { Step } from '@mui/material';
import { useEffect, useState } from 'react';

export interface NewOrderFormData {
    name: string;
    email: string;
    phone_number: string;
    takeOutLocal: number;
    flavors: number[];
}

interface Step {
    step: number;
    component: React.ReactNode;
}

export default function Order() {
    const [currentStepID, setCurrentStepID] = useState(1);
    const [currentStep, setCurrentStep] = useState<Step>();

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

    const maxPassos = 3;

    const onNextStep = () => {
        const next = currentStepID + 1;
        if(next > maxPassos){
            return;
        }
        setCurrentStepID(next);
    }

    const onSubmit = (data: NewOrderFormData) => {
        console.log(data)
        // dispatch(createUser(data));
    };

    const steps: Step[] = [
        {
            step: 1,
            component: <BasicData control={control} onNextStep={onNextStep} />
        },
        {
            step: 2,
            component: <BasicData control={control} onNextStep={onNextStep} />
        },
        {
            step: 3,
            component: <BasicData control={control} onNextStep={onNextStep} />
        },
    ]

    useEffect(() => {
        const targetStep = steps?.find((step)=> step.step == currentStepID)
        if(targetStep){
            setCurrentStep(targetStep);
        }
    }, [currentStepID]);

    if(!currentStep){
        return;
    }

    return (
        <div className={styles.content}>
            <h1 className={styles.pageTitle}>Faça seu pedido</h1>
            <h2>Passo {currentStep?.step} de {steps?.length}</h2>
            <div className={styles.form}>
                <form>
                    {currentStep?.component}
                </form>
            </div>
        </div>
    );
}
