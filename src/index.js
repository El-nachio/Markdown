/* eslint-disable react/no-unknown-property */
import React from 'react';
import ReactDOM from 'react-dom';
import { marked } from 'marked';
import DOMpurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            input: preview,
            hidden: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }
    //preview the text area message
    componentDidMount() {
        if(this.state.hidden) {
            $("#edit").click(function() {
                console.log('im removed')
                $("div").remove(".previewer");
                $(".markdown-editor").css("margin-bottom", '0px');
            })
        } 
        else {
            $("#edit").click(function() {
                console.log('im added')
                $(".markdown-editor").css("margin-bottom", '25px');
            })
        }
        $("#prev").click(function() {
            $("div").remove(".markdown-editor");
            $(".previewer").css('margin-bottom', '25px')
            $(".previewer").css('margin-top', '25px')
        })
        let cleanHTML = DOMpurify.sanitize(marked(this.state.input, { USE_PROFILES: { html: true } }));
        document.getElementById('preview').innerHTML = cleanHTML;
    }
    //render the text from the text area
    handleChange(event) {
        let cleanHTML = DOMpurify.sanitize(marked(event.target.value, { USE_PROFILES: { html: true } }));
        document.getElementById('preview').innerHTML = cleanHTML;
    }

    handleClick() {
        this.setState({
            hidden: !this.state.hidden,
        })
        console.log(this.state.hidden)
    }
    render() {
        return (
            <div id='markdown'>
                <div className='markdown-editor'>
                    <span><label forhtml='editor'>Editor <a href='#' id='edit' onClick={this.handleClick}><FontAwesomeIcon icon={faExpandAlt} /></a></label></span>
                    <textarea id='editor' className='form-control' rows='10' onChange={this.handleChange} defaultValue={this.state.input}></textarea>
                </div>
                <div className='previewer'>
                    <label forhtml='preview' id='label'>Previewer <a href='#' id='prev' onClick={this.handleClick}><FontAwesomeIcon icon={faExpandAlt} /></a></label>
                    <div id='preview'></div>
                </div>
            </div>
        )
    }
}

const preview = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`

ReactDOM.render(<App/>, document.getElementById('root'));