import { useState,useEffect } from 'react';
import {
  TextInput,
  Checkbox,
  Button,
  Grid,
  Box,
  Flex,
  Text,
  Group,
  Select,
  ComboboxItem,
  
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { YearPickerInput, MonthPickerInput ,DatesProvider,DateTimePicker,DatePickerInput} from '@mantine/dates';
import { error } from 'console';
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';

export default function RegisterPateint() {
  const HAPi_ADD = process.env.NEXT_PUBLIC_HAPI_FHIR_IP_ADDRESS;
  const HAPI_PORT = process.env.NEXT_PUBLIC_HAPI_FHIR_PORT;
  const baseUrl = "http://"+HAPi_ADD+":"+HAPI_PORT+"/fhir/Patient";

  const [gender, setGender] = useState<string >('');


  const form = useForm({
    initialValues: {
      email: '',
      fullName: '',
      gender: '',
      yearOfBirth: '',
      monthOfBirth: '',
      dayOfBirth: '',
      termsOfService: false,
    },
    // Validation function for email
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  


  const handleSubmit =async (event:React.FormEvent) => {
    event.preventDefault();
    const values = form.values;
    const dob = dayjs(values.dayOfBirth).format('YYYY-MM-DD');
  
    console.log(values);
        const patientResource ={
            resourceType: "Patient",
            name: [
                {
                    use: "official",
                    // family: values.fullName.split(" ")[0],
                    // given: [values.fullName.split(" ")[1]]
                    text: values.fullName,

                }
            ],
            gender:values.gender,
            birthDate:dob,

        };
        const response = await fetch(baseUrl,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(patientResource)
        });
        if(response.ok){
            console.log("Patient Created",response);

    }else{
        console.log("Error",response);
    }
    
     
  };


  return (
    
        <Box m="md" p="md"bg="gray.1" maw="600" mx="auto">
          <form onSubmit={handleSubmit}>
            
            <TextInput
              withAsterisk
              label="Full Name"
              placeholder="John Doe"
              {...form.getInputProps('fullName')}
            />

           
           
                    <Flex
            mih={50}
            // bg="rgba(0, 0, 0, .3)"
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
            >
               
          

        <DatesProvider settings={{ timezone: 'America/New_York' }}  >
          <DateTimePicker label="Pick a Date" placeholder="Pick a Date" defaultValue={new Date('2000-10-03')} 
          {...form.getInputProps('dayOfBirth')}
          />
         
        </DatesProvider>
               
            </Flex>

            <Flex  gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            >
        
          <Select
      label="Gender"
      placeholder="Pick male"
      data={['male', 'female', 'other']}
      defaultValue="male"
      clearable
      onChange={(selectedValue) => {
        if (selectedValue !== null) {
          form.setFieldValue('gender', selectedValue)
        }
      }}  />
         </Flex>
        

            {/* Submit Button */}
            <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
          </form>
        </Box>
 
  );
}

