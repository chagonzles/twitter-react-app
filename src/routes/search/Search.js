import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Search.css';
import {Row,Col,FormGroup,FormControl,ControlLabel,Button,Glyphicon} from 'react-bootstrap';
import SearchTimeline from '../../components/Tweet/SearchTimeline';

class Search extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Row>
            <Col sm={12}>
              <SearchTimeline title={this.props.title} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Search);
