import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";
// import ExtensionsHeader from "../extensionsHeader";
import Radio from "../../components/@vuexy/radio/RadioVuexy";
import { IntlContext } from "../../utility/context/Internationalization";
import { FormattedMessage } from "react-intl";

class I18nExtension extends React.Component {
  componentDidMount() {
    const { context } = this;
    const storedLocale = localStorage.getItem("locale");

    // Set initial locale based on stored value or default to 'en'
    if (storedLocale) {
      context.switchLanguage(storedLocale);
    } else {
      context.switchLanguage("en");
    }
  }
  

  render() {
    return (
      <React.Fragment>
        {/* <ExtensionsHeader
          title="React Intl"
          subTitle="This library provides React components and an API to format dates, numbers, and strings, including pluralization and handling translations."
          link="https://www.npmjs.com/package/react-intl"
        /> */}
        <IntlContext.Consumer>
          {(context) => {
            this.context = context; // Store context for later use

            const handleLanguageChange = (locale) => {
              context.switchLanguage(locale);
              localStorage.setItem("locale", locale); // Store selected language in localStorage
            };
            return (
              <Row>
                <Col sm="12">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <FormattedMessage
                          id="change.locale"
                          defaultMessage="Change Locale"
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="language-options">
                      
                        <Radio
                          name="i18n-lang-radio"
                          // onClick={() => {
                          //   context.switchLanguage("en");
                          // }}
                          onClick={() => handleLanguageChange("en")}
                          label={
                            <FormattedMessage
                              id="language.english"
                              defaultMessage="English"
                            />
                          }
                          className="mb-1"
                          defaultChecked={context.state.locale === "en"}
                        />
                        <Radio
                          name="i18n-lang-radio"
                          // onClick={() => {
                          //   context.switchLanguage("hi");
                          // }}
                          onClick={() => handleLanguageChange("hi")}
                          label={
                            <FormattedMessage
                              id="language.hindi"
                              defaultMessage="Hindi"
                            />
                          }
                          className="mb-1"
                          defaultChecked={context.state.locale === "hi"}
                        />

                        {/* <Radio
                          name="i18n-lang-radio"
                          onClick={() => {
                            context.switchLanguage("fr");
                          }}
                          label={
                            <FormattedMessage
                              id="language.french"
                              defaultMessage="French"
                            />
                          }
                          className="mb-1"
                          defaultChecked={context.state.locale === "fr"}
                        />
                        <Radio
                          name="i18n-lang-radio"
                          onClick={() => {
                            context.switchLanguage("de");
                          }}
                          label={
                            <FormattedMessage
                              id="language.german"
                              defaultMessage="German"
                            />
                          }
                          className="mb-1"
                          defaultChecked={context.state.locale === "de"}
                        />
                        <Radio
                          name="i18n-lang-radio"
                          onClick={() => {
                            context.switchLanguage("pt");
                          }}
                          label={
                            <FormattedMessage
                              id="language.portuguese"
                              defaultMessage="Portuguese"
                            />
                          }
                          className="mb-1"
                          defaultChecked={context.state.locale === "pt"}
                        /> */}
                      </div>
                      {/* <Card className="border mt-3">
                        <CardHeader>
                          <CardTitle>
                            <FormattedMessage
                              id="card.title"
                              defaultMessage="Card Title"
                            />
                          </CardTitle>
                        </CardHeader>
                        <CardBody>
                          <CardText>
                            <FormattedMessage
                              id="text"
                              defaultMessage="This is a sample text."
                            />
                          </CardText>
                        </CardBody>
                      </Card> */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            );
          }}
        </IntlContext.Consumer>
      </React.Fragment>
    );
  }
}

export default I18nExtension;
