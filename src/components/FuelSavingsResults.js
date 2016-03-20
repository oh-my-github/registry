import React, { Component, PropTypes, } from 'react'
import NumberFormatter from '../businessLogic/numberFormatter'

export default class FuelSavingsResults extends Component {

  static propTypes = {
    savings: PropTypes.object.isRequired,
  }

  render() {

    const { savings, } = this.props

    const savingsExist = NumberFormatter.scrubFormatting(savings.monthly) > 0
    const savingsClass = savingsExist ? 'savings' : 'loss'
    const resultLabel = savingsExist ? 'Savings' : 'Loss'

    //You can even exclude the return statement below if the entire component is
    //composed within the parentheses. Return is necessary here because some
    //variables are set above.
    return (
      <table>
        <tbody>
        <tr>
          <td className="fuel-savings-label">{resultLabel}</td>
          <td>
            <table>
              <tbody>
              <tr>
                <td>Monthly</td>
                <td>1 Year</td>
                <td>3 Year</td>
              </tr>
              <tr>
                <td className={savingsClass}>{savings.monthly}</td>
                <td className={savingsClass}>{savings.annual}</td>
                <td className={savingsClass}>{savings.threeYear}</td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </table>
    )
  }
}
