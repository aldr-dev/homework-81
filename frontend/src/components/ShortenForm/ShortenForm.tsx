import {Box, Grid, Link, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import React, {useState} from 'react';
import {toast} from 'react-toastify';
import axiosApi from '../../axiosApi';
import {ShortenResponse} from '../../types';

const ShortenForm = () => {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(event.target.value);
  };

  const onSubmitForm = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      if (originalUrl.trim().length !== 0) {
        setIsLoading(true);
       const response = await axiosApi.post<ShortenResponse>('/shorters', {originalUrl});
        setIsLoading(false);
        setShortUrl(response.data.shortUrl);
        setOriginalUrl('');
      }
    } catch (error) {
      toast.error('Error, failed to shorten url');
      console.error('Error, failed to shorten url' + error);
    }
  };

  return (
    <>
      <Typography variant={'h3'} sx={{mb: 5, textAlign: 'center'}}>Shorten your link!</Typography>
      <Box onSubmit={onSubmitForm} component="form" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={onFieldChange}
              label="Enter URL here"
              value={originalUrl}
              id="shorten"
              required
            />
          </Grid>
        </Grid>
        <LoadingButton
          sx={{mt: 2}}
          color="primary"
          type="submit"
          loading={isLoading}
          startIcon={<ContentCutIcon/>}
          loadingPosition="start"
          variant="contained">
          <span>Shorten!</span>
        </LoadingButton>
      </Box>
      {shortUrl.length > 0 ? (
        <>
          <Typography sx={{mt: 4, mb: 4, textAlign: 'center', fontWeight: '600'}}>Your link now looks like this:</Typography>
          <Link href={`http://localhost:8000/shorters/${shortUrl}`} sx={{display: 'block', textAlign: 'center', color: '#3364A0'}}>http://localhost:8000/{shortUrl}</Link>
        </>
      ) : null}
    </>
  );
};

export default ShortenForm;