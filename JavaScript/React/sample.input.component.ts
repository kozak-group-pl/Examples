import {
    DatePicker as _DatePicker,
    LocalizationProvider,
  } from '@mui/x-date-pickers';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { DatePickerProps } from '@mui/x-date-pickers/DatePicker/DatePicker.types';
  import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
  import dayjs from 'dayjs';
  import React, { FC } from 'react';
  
  export type ComponentDatePickerProps = {
    className?: string;
    error?: boolean;
    helperText?: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    value: string;
  };
  
  const DatePicker: FC<ComponentDatePickerProps> = (props) => {
    const { value, onChange, className, error, helperText, ...rest } = props;
  
    const Component = (
      _props: DatePickerProps<string> & React.RefAttributes<HTMLDivElement>,
    ) => {
      const { value, ...props } = _props;
  
      if (value) {
        // @ts-ignore
        props.value = dayjs(value);
      }
  
      return <_DatePicker {...props} />;
    };
  
    return (
      <div className={className}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer sx={{ p: 0 }} components={['DatePicker']}>
            <Component
              className="w-100"
              value={value}
              onChange={(newValue) => {
                onChange({
                  // @ts-ignore
                  target: { value: dayjs(newValue).format('DD/MM/YYYY') },
                });
              }}
              slotProps={{
                textField: {
                  error: error,
                  helperText: helperText,
                }
              }}
              {...rest}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    );
  };
  
  export default DatePicker;
  