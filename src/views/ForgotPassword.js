// import React from 'react';
// import {
//   Card, Button, CardImg, CardTitle, CardText, CardGroup,
//   CardSubtitle, CardBody,Form, FormGroup, Label, Input, FormText
// } from 'reactstrap';

// const Login = (props) => {

    



//   return (
      
//     <CardGroup>
//     <Card style={{marginLeft:"90px",marginTop:"30px",height:"500px",marginRight:"0px",backgroundColor:"orange"}}>
//       <CardImg top width="100%"  src="/assets/background.svg" alt="" />
//       <CardBody >
       
//  </CardBody>
//     </Card>
//     <Card style={{marginRight:"190px",marginTop:"30px"}}>
//       <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
//       <CardBody>
//       <Form>
 
//       <FormGroup>
//         <b style={{color:"black"}}><Label for="exampleSapID">Sap ID</Label></b>
//         <Input type="numeric" name="sapid" id="exampleSapID" placeholder="with a placeholder" />
//       </FormGroup>
//       <FormGroup>
//         <b style={{color:"black"}}><Label for="examplePassword">Password</Label></b>
//         <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
//       </FormGroup>
      
     
     
    
//       <Button  style={{marginLeft:"110px"}}color="primary" size="md" active>Login</Button>{' '}
//     </Form>
        
//       </CardBody>
//     </Card>
   
//   </CardGroup>
//   );
// };

// export default Login;




import React,{useState} from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Img from '../images/shards-dashboards-logo.svg'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '30vh',
  },
  image: {
    backgroundImage: 'url(https://www.ibm.com/blogs/blockchain/wp-content/uploads/2019/12/Retina_Display-758591537.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
   
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    height:'80%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        {/* <img style={{height:"10px",width:"20px"}} src= {Img} alt="pic" /> */}
        <br/>

          <Avatar  style={{backgroundColor:"#eb7a34"}}className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <form className={classes.form} noValidate>
              <br/>
            <br/>
            <br/>
           
         
                  <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <b> 
             
            
            
            
            </b>
            
            <Button style={{marginTop:"30px"}}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Reset
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                If you want to login, click here?
                </Link>
              </Grid>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>

              <Grid item >
                
              </Grid>
            </Grid>
          
          </form>
        </div>
      </Grid>
    </Grid>
  );
}