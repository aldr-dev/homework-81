import {Container} from '@mui/material';
import ShortenForm from '../../components/ShortenForm/ShortenForm';

const Home = () => {
  return (
    <Container sx={{mt: 5, mb: 5}} maxWidth={'lg'}>
      <ShortenForm />
    </Container>
  );
};

export default Home;