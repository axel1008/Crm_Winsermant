import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProfileSection from '../components/ProfileSection';
import ProfileTabs from '../components/ProfileTabs';

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);

  const user = {
    username: "Angel Hernández",
    role: "Admin",
    email: "admin@gmail.com"
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <ProfileSection user={user} />
      <ProfileTabs value={tabValue} handleChange={handleTabChange} />
    </Box>
  );
};

export default Profile;
