import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { loadToDo } from '../src/todoFunctions';

const Home = () => {
  const [input, setInput] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(true);
  const [addressAccount, setAddresAccount] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleInputChange = (e: any) => setInput(e.currentTarget.value);

  const handleAddTask = async () => {
    await contract.createTask(input, { from: addressAccount });
    setInput('');
    setRefresh(true);
  };

  const handleToggled = async (id: number) => {
    await contract.toggleCompleted(id, { from: addressAccount });
    setRefresh(true);
  };

  const theme = useTheme();

  useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    loadToDo()
      .then((response: any) => {
        setIsError(false);
        setAddresAccount(response.addressAccount);
        setTasks(response.tasks);
        setContract(response.todoContract);
      })
      .catch((error) => {
        setIsError(true);
        setErrorText(error.message);
        console.log(error);
      });
  });

  return (
    <Stack direction='column' justifyContent='center' sx={{ width: '100%' }}>
      <Stack
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ width: '100%' }}
        rowGap={3}>
        {isError ? (
          <Typography>{errorText}</Typography>
        ) : (
          <>
            <Typography variant='h3'>Todo blockchain</Typography>
            <Stack width='100%' direction='row' columnGap={1}>
              <TextField
                value={input}
                variant='outlined'
                label='Add task'
                fullWidth
                onChange={handleInputChange}
              />
              <Button
                variant='contained'
                color='primary'
                onClick={handleAddTask}>
                Add
              </Button>
            </Stack>
            <Typography>Tasks in todo state</Typography>
            {tasks === null ? (
              <CircularProgress />
            ) : (
              tasks.map((task, index) =>
                !task[2] ? (
                  <Paper
                    variant='outlined'
                    sx={{
                      p: 1,
                      backgroundColor: theme.palette.secondary.light,
                    }}>
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                      columnGap={1}
                      sx={{ width: 600 }}
                      key={index}>
                      <Typography sx={{ mr: 0 }}>{task[1]}</Typography>
                      <Button
                        variant='contained'
                        color='primary'
                        sx={{ ml: 0 }}
                        onClick={() => handleToggled(task[0].toNumber())}>
                        Done
                      </Button>
                    </Stack>
                  </Paper>
                ) : (
                  <></>
                )
              )
            )}
            <Typography>Tasks done</Typography>
            {tasks === null ? (
              <CircularProgress />
            ) : (
              tasks.map((task, index) =>
                task[2] ? (
                  <Paper
                    variant='outlined'
                    sx={{
                      p: 1,
                      backgroundColor: theme.palette.secondary.dark,
                    }}>
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                      columnGap={1}
                      sx={{ width: 600 }}
                      key={index}>
                      <Typography>{task[1]}</Typography>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => handleToggled(task[0].toNumber())}>
                        Undone
                      </Button>
                    </Stack>
                  </Paper>
                ) : (
                  <></>
                )
              )
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Home;
