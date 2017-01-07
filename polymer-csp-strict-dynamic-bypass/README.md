# POC for the strict-dynamic CSP bypass using the iron-jsonp-library Polymer component
by @kkotowicz - http://twitter.com/kkotowicz

https://github.com/PolymerElements/iron-jsonp-library

The issue is that this component uses the document.createElement('script') from markup, and CSP strict-dynamic propagates the nonce through that mechanism (see e.g. http://blog.kotowicz.net/2016/06/reflections-on-trusting-csp.html)

For the CSP bypass to work:
 - The Polymer app itself needs to use this component (so that the code is present in the vulnanized JS file)
 - There needs to be a markup injection in the HTML page.

## How to build locally:
```
$ npm install -g bower
$ npm install -g polymer-cli
$ bower install
```
Vulcanize the poc to make it CSP compatible - see https://www.polymer-project.org/1.0/docs/tools/optimize-for-production:
```
$ npm install -g vulcanize
$ npm install -g crisper
$ vulcanize src/poc.html --inline-script | crisper --html src/poc.vulcanized.html --js src/poc.vulcanized.js
```
Actually add the CSP header and the nonce to the vulcanized HTML:
```
<head><meta http-equiv=Content-Security-Policy content="
  object-src 'none';
  script-src 'nonce-random' 'unsafe-inline' 'unsafe-eval' 'strict-dynamic' https: http:;"
  >
<script nonce=random src="poc.vulcanized.js" ...
```
See the poc locally:
```
$ polymer serve
```
Visit http://localhost:8080/src/poc.vulcanized.html
