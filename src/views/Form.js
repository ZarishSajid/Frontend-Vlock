import React from 'react'
// const FormItem = Form.Item;
// const { Text } = Typography;

class Form extends React.Component {
  constructor(props) {
    super(props);
    console.log("",props);
   
  }
  
  
  render() 
  { console.log("Zara Inside render", this.props);
    const {polls, castVote } = this.props;

    // const { getFieldDecorator } = this.props.form;
    // const userData =
    //   this.props.location.aboutProps && this.props.location.aboutProps.userData;


    // window.location.reload();
    
    return (
     
      <form 
       
        onSubmit={(event) => {
          event.preventDefault();
          castVote(this.candidateId);
          
      }}>
        <div class='form-group'>
        {/* <select ref={(input) => this.candidateId = input} class='form-control'>
            {this.props.candidates.map((candidate) => {
              return <option value={candidate.id}>{candidate.name}</option>
            })}
          </select> */}
          {/* <label>Select Option</label> */}

          <select ref={(input) => this.candidateId = input} class='form-control'>
            {polls.map((poll) => {
              return <option value={poll.id}>{poll.option}</option>
              
         
            })}
             
          </select>
        </div>
        {/* <button type='submit' class='btn btn-primary'>Vote</button> */}
        
        <hr />
      </form>
    )
 
  }
   
    
}

export default Form