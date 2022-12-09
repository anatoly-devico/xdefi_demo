### Prerequisites: 
1.  Install Node.js v16 or later

2.  Navigate to project via terminal

3.  Execute `npm i` command in terminal to install all required libraries for executing tests

4.  Execute following commands to install allure cli that needed for generating test results:
    
Linux:

- ``sudo apt-add-repository ppa:qameta/allure``
- ``sudo apt-get update``
- ``sudo apt-get install allure``

Mac OS X:

- ``brew install allure``

For getting more information please visit https://docs.qameta.io/allure/

```
$ brew install allure
```
---
- To trigger test run, execute `npm run wdio`
- To open allure report, execute `npm run openReport`
---
### Key folders:
* `core` folder contains files with core wdio wrapper.
* `pages` folder contains files with selectors and actions for these selectors.
* `spec` folder contains files with tests.
* `allure-results` folder contains test results which will be used for generating report.
* `allure-report` folder contains generated report.
* `fixtures` folder contains files with test data