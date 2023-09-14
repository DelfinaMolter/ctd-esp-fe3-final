import { TextField } from '@mui/material';
import { ChangeEvent, FocusEvent } from 'react';
import { Control, Controller } from 'react-hook-form';

interface CustomTextFieldProps {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  control: Control<any>;
  defaultValue?: string;
  textFieldProps?: Record<string, any>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const CustomTextField = ({
  name,
  label,
  type,
  required,
  control,
  defaultValue,
  textFieldProps,
  onChange,
  onFocus
}: CustomTextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          variant="outlined"
          fullWidth
          required={required}
          sx={{ mb: 0 }}
          {...textFieldProps}
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e as ChangeEvent<HTMLInputElement>);
          }}
          onFocus={(e) => {
            onFocus?.(e as FocusEvent<HTMLInputElement>);
          }}
        />
      )}
    />
  );
};


