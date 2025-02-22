import { useState, useEffect } from 'react';

const useForm = (validate) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        guest: 'No',
        guestName: '',
        submitted: false,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            setValues({ ...values, submitted: true });
        }
    }, [errors, isSubmitting]);

    return { handleChange, handleSubmit, values, errors };
};

export default useForm;