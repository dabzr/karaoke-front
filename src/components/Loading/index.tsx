import CircularProgress from '@mui/material/CircularProgress';

export function Loading() {
  
  return (
    <div className="absolute top-1/2 left-1/2">
      <CircularProgress/>
    </div>
  );
}
