import React, { PropTypes, } from 'react'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'
import { white, } from 'material-ui/lib/styles/colors'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import * as style from './style.js'

export default class AvatarCard extends React.Component {
  static propTypes = {
    fetchData: React.PropTypes.func.isRequired,
    profiles: React.PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchData()
  }

  renderCardMedia = (profile) => {
    return(
      <CardMedia
        overlay={<CardTitle title={profile.user.name} subtitle={`@${profile.user.login}`}  />}
      >
        <img src={profile.user.avatar_url} />
      </CardMedia>
    )
  }

  renderCardText = (user) => {
    let contents = {
      '1ambda' : 'Junior Data Engineer at Data Infrastructure Team - SK planet',
      'tocology' : 'IT Solution Assistant Researcher at Samsung SDS',
      'njir' : 'General Imaging Software Engineer at GE Healthcare',
    }

    return(
      <CardText>
        {contents[user]}
      </CardText>
    )
  }

  renderCardActions = (user) => {
    let email = {
      '1ambda' : '1amb4a@gmail.com',
      'tocology' : 'hwangjun7777@gmail.com',
      'njir' : 'njirtak@gmail.com',
    }

    let linkedin = {
      '1ambda' : 'http://kr.linkedin.com/in/1ambda/en',
      'tocology' : 'https://kr.linkedin.com/in/junhohwang/en',
      'njir' : 'http://kr.linkedin.com/in/hyungtak/en',
    }

    return(
      <CardActions>
        <IconButton touch tooltipPosition="bottom-right"
                    linkButton href={`http://github.com/${user}`} target="_blank">
          <FontIcon className="fa fa-github" style={style.icon} />
        </IconButton>
        <IconButton touch tooltipPosition="bottom-right"
                    linkButton href={linkedin[user]} target="_blank">
          <FontIcon className="fa fa-linkedin" style={style.icon} />
        </IconButton>
        <IconButton touch tooltipPosition="bottom-right"
                    linkButton href={`mailto:${email[user]}`} target="_blank">
          <FontIcon className="fa fa-envelope" style={style.icon} />
        </IconButton>
      </CardActions>
    )
  }

  render() {
    const { profiles, } = this.props
    const developers = profiles.filter(profile => {
      return profile.user.login === '1ambda' || profile.user.login === 'tocology' || profile.user.login === 'njir'
    })

    return (
      <div>
        {developers.sort((a, b) => {
          const aVal = a.user['followers'] || 0
          const bVal = b.user['followers'] || 0
          return aVal < bVal
        }).map((row) => {
          return (
            <div style={style.divStyle}>
              <Card style={{width: '260px', }}>
                {this.renderCardMedia(row)}
                {this.renderCardText(row.user.login)}
                {this.renderCardActions(row.user.login)}
              </Card>
            </div>
          )
        })}
      </div>
    )
  }
}
