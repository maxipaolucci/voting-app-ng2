//************ WHY vendor.ts? ******************************

// The idea is to have one bundle with only the application code and one bundle with only with vendor code.
// To make this separation to work, we need in vendor.ts to load our vendors too, so when webpack sees that we did an
// import 'foo' in app.ts (or any .ts in our application) and in vendor.ts, will see that they are in common so they
// will get removed from the application code.
// So, if you for example comment out the line where you import the router in vendor.ts and you import the router
// only in application code, it will work but the entire router code will end in the final app.ts bundle instead
// of the vendor bundle.

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
// RxJS
import 'rxjs';

// Socket.io-client
import 'socket.io-client';

// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
