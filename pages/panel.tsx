import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { loadAccessControl } from '../src/funcs';

const Panel = () => {
  const [refresh, setRefresh] = useState<boolean>(true);
  const [addressAccount, setAddresAccount] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [accounts, setAccounts] = useState<any>();

  useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    loadAccessControl()
      .then((response: any) => {
        setAddresAccount(response.addressAccount);
        setContract(response.accessControlContract);
        setIsAdmin(response.isAdmin);
        setAccounts(response.accounts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  console.log(accounts);

  return (
    <Stack direction='column' justifyContent='center' sx={{ px: 2, py: 3 }}>
      {isAdmin ? (
        <Typography>Welcome to the Admin Panel</Typography>
      ) : (
        <Typography>
          You have no access to this Panel, it's for Admin role only
        </Typography>
      )}
    </Stack>
  );
};

export default Panel;
