/*

 ----------------------------------------------------------------------------
 | ewd-session: Session management using ewd-document-store                 |
 |                                                                          |
 | Copyright (c) 2016 M/Gateway Developments Ltd,                           |
 | Reigate, Surrey UK.                                                      |
 | All rights reserved.                                                     |
 |                                                                          |
 | http://www.mgateway.com                                                  |
 | Email: rtweed@mgateway.com                                               |
 |                                                                          |
 |                                                                          |
 | Licensed under the Apache License, Version 2.0 (the "License");          |
 | you may not use this file except in compliance with the License.         |
 | You may obtain a copy of the License at                                  |
 |                                                                          |
 |     http://www.apache.org/licenses/LICENSE-2.0                           |
 |                                                                          |
 | Unless required by applicable law or agreed to in writing, software      |
 | distributed under the License is distributed on an "AS IS" BASIS,        |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 | See the License for the specific language governing permissions and      |
 |  limitations under the License.                                          |
 ----------------------------------------------------------------------------

*/

module.exports = function(db, routineName) {

  routineName = routineName || 'ewdSymbolTable';
  return {
    clear: function() {
      var func = {
        function: 'clearSymbolTable^' + routineName
      };
      return db.function(func);
    },
    save: function(session) {
      var gloRef = '^' + session.documentName + '("session",' + session.id + ',"ewd_symbolTable")';
      var func = 'saveSymbolTable^' + routineName;
      // VDP CHANGE/FIX for GT.M - use more verbose function call syntax required by GT.M
      // return db.function(func, gloRef);
      return db.function({function: func, arguments: [gloRef]});
    },
    restore: function(session) {
      var gloRef = '^' + session.documentName + '("session",' + session.id + ',"ewd_symbolTable")';
      var func = 'restoreSymbolTable^' + routineName;
      return db.function(func, gloRef);
    }
  };
};
