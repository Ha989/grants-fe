import { Button } from '@mui/material';
import React from 'react';
import { Link as RouterLink} from "react-router-dom";

function CreatorPage() {
  return (
    <div>CreatorPage
      <Button component={RouterLink} to="/creator/account">Get me</Button>
    </div>
  )
}

export default CreatorPage;