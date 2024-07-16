import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';

const DynamicForm = ({ fields, handleSubmit }) => {
    // Define the validation schema based on the fields
    const validationSchema = yup.object().shape(
        fields.reduce((acc, field) => {
            let schema = yup.mixed(); // Initialize as mixed type

            // Set type-specific validation based on field type
            switch (field.type) {
                case 'string':
                    schema = yup.string();
                    break;
                case 'number':
                    schema = yup.number().typeError(`${field.name} must be a number`);
                    break;
                case 'email':
                    schema = yup.string().email(`${field.name} must be a valid email`);
                    break;
                case 'url':
                    schema = yup.string().url(`${field.name} must be a valid URL`);
                    break;
                case 'date':
                    schema = yup.date().typeError(`${field.name} must be a valid date`);
                    break;
                case 'password':
                    schema = yup.string().min(8, `${field.name} must be at least 8 characters`);
                    break;
                case 'boolean':
                    schema = yup.boolean();
                    break;
                default:
                    schema = yup.string(); // Default to string validation
                    break;
            }

            // Apply required validation only if not optional
            if (!field.optional) {
                schema = schema.required(`${field.name} is required`);
            }

            // Add the schema to the accumulator
            acc[field.name] = schema;
            return acc;
        }, {})
    );

    // Generate default values with optional defaultValue
    const defaultValues = fields.reduce((acc, field) => {
        if (field.defaultValue !== undefined) {
            acc[field.name] = field.defaultValue;
        } else {
            if (field.type === 'boolean') {
                acc[field.name] = false;
            } else {
                acc[field.name] = '';
            }
        }
        return acc;
    }, {});

    const {
        handleSubmit: formSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues, // Set default values
    });

    const onSubmit = (data) => {
        handleSubmit(data);
        reset(); // Reset form fields
    };

    return (
        <form onSubmit={formSubmit(onSubmit)}>
            {fields.map((field, index) => (
                <div key={index} style={{ marginBottom: 16 }}>
                    <FormLabel>{field.name} {field.optional ? '(optional)' : '(required)'}</FormLabel>
                    <FormControl fullWidth>
                        <Controller
                            name={field.name}
                            control={control}
                            render={({ field: controllerField }) => {
                                if (field.type === 'boolean') {
                                    return (
                                        <RadioGroup
                                            row
                                            value={controllerField.value}
                                            onChange={(e) => controllerField.onChange(e.target.value === 'true')}
                                        >
                                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                            <FormControlLabel value={false} control={<Radio />} label="No" />
                                        </RadioGroup>
                                    );
                                } else {
                                    return (
                                        <TextField
                                            {...controllerField}
                                            type={field.type}
                                            fullWidth
                                            variant="outlined"
                                            error={!!errors[field.name]}
                                            helperText={errors[field.name]?.message}
                                        />
                                    );
                                }
                            }}
                        />
                    </FormControl>
                </div>
            ))}
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
                Submit
            </Button>
        </form>
    );
};

DynamicForm.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['string', 'number', 'email', 'url', 'date', 'password', 'boolean']).isRequired,
            defaultValue: PropTypes.any, // optional
            optional: PropTypes.bool // optional
        })
    ).isRequired,
    handleSubmit: PropTypes.func.isRequired
};


export default DynamicForm;