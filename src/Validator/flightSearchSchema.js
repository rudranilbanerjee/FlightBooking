import * as Yup from 'yup';

const flightSearchSchema = Yup.object().shape({
  from_airport: Yup.string().required('This field is required'),
  to_airport: Yup.string().required('This field is required'),
  departure_date: Yup.string().required('Departure date is required'),
  adults: Yup.number().min(1, 'At least one adult is required').required('Adults field is required'),
});

export default flightSearchSchema;