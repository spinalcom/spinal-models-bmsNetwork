"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promiseLoad = promiseLoad;
exports.guid = guid;

require("spinal-core-connectorjs");

const globalType = typeof window === "undefined" ? global : window;

function promiseLoad(SpinalNodePointer) {
  if (SpinalNodePointer.ptr instanceof globalType.Ptr && SpinalNodePointer.ptr.data.value !== 0 && typeof FileSystem._objects[SpinalNodePointer.ptr.data.value] !== "undefined") return Promise.resolve(FileSystem._objects[SpinalNodePointer.ptr.data.value]);else return new Promise(resolve => {
    SpinalNodePointer.ptr.load(resolve);
  });
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function guid(constructor) {
  return constructor + "-" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4() + "-" + Date.now().toString(16);
} // let Utilities = {};
// const globalType = typeof window === "undefined" ? global : window;
// Utilities.getViewer = function() {
//   return new Promise((resolve, reject) => {
//     if (globalType.v === "undefined") {
//       let interval = setInterval(() => {
//         if (globalType.v !== "undefined") {
//           resolve(globalType.v);
//           clearInterval(interval);
//         }
//       }, 500);
//     } else resolve(globalType.v);
//   });
// };
// Utilities.promiseGetProperties = function(_dbId) {
//   return new Promise(resolve => {
//     Utilities.getViewer().then(viewer => {
//       viewer.getProperties(_dbId, resolve);
//     });
//   });
// };
// Utilities.promiseGetExternalIdMapping = function(_externalId) {
//   return new Promise(resolve => {
//     Utilities.getViewer().then(viewer => {
//       viewer.model.getExternalIdMapping(res => {
//         resolve(res[_externalId]);
//       });
//     });
//   });
// }
// // Utilities.promiseLoad = function(_ptr) {
// //   return new Promise(resolve => {
// //     _ptr.load(resolve);
// //   });
// // }
// Utilities.promiseLoad = function(_ptr) {
//   if (
//     _ptr instanceof globalType.Ptr &&
//     _ptr.data.value != 0 &&
//     typeof FileSystem._objects[_ptr.data.value] != "undefined"
//   )
//     return Promise.resolve(FileSystem._objects[_ptr.data.value]);
//   else
//     return new Promise(resolve => {
//       _ptr.load(resolve);
//     });
// };
// Utilities.getExternalId = async function(_dbId) {
//   let properties = await Utilities.promiseGetProperties(_dbId);
//   return properties.externalId;
// };
// Utilities.getDbIdByExternalId = async function(_externalId) {
//   let dbid = await Utilities.promiseGetExternalIdMapping(_externalId);
//   return dbid;
// };
// Utilities.arraysEqual = function(arrayA, arrayB) {
//   if (arrayA === arrayB) return true;
//   if (arrayA == null || arrayB == null) return false;
//   if (arrayA.length != arrayB.length) return false;
//   arrayA.sort();
//   arrayB.sort();
//   for (var i = 0; i < arrayA.length; ++i) {
//     if (arrayA[i] !== arrayB[i]) return false;
//   }
//   return true;
// };
// Utilities.containsLstById = function(_list, _node) {
//   for (let index = 0; index < _list.length; index++) {
//     const element = _list[index];
//     if (element.id.get() == _node.id.get()) return true;
//   }
//   return false;
// };
// Utilities.containsLstModel = function(_list, _model) {
//   for (let index = 0; index < _list.length; index++) {
//     const element = _list[index];
//     if (element.get() == _model.get()) return true;
//   }
//   return false;
// };
// Utilities.containsLst = function(_list, _element) {
//   for (let index = 0; index < _list.length; index++) {
//     const element = _list[index];
//     if (element.get() == _element) return true;
//   }
//   return false;
// };
// Utilities.include = function(arr, obj) {
//   return arr.indexOf(obj) != -1;
// };
// Utilities.getIndex = function(arr, obj) {
//   return arr.indexOf(obj);
// };
// Utilities.getIds = function(array) {
//   let res = [];
//   for (let index = 0; index < array.length; index++) {
//     res.push(array[index].id.get());
//   }
//   return res;
// };
// // Utilities.addNotExisting = function(arr, obj) {
// //   return (arr.indexOf(obj));
// // }
// Utilities.concat = function(listA, listB) {
//   let res = [];
//   for (let index = 0; index < listA.length; index++) {
//     res.push(listA[index]);
//   }
//   for (let index = 0; index < listB.length; index++) {
//     res.push(listB[index]);
//   }
//   return res;
// };
// Utilities.allButMeById = function(_list, _node) {
//   let res = [];
//   for (let index = 0; index < _list.length; index++) {
//     const node = _list[index];
//     if (node.id.get() != _node.id.get()) {
//       res.push(node);
//     }
//     return res;
//   }
// };
// Utilities.guid = function(_constructor) {
//   return (
//     _constructor +
//     "-" +
//     this.s4() +
//     this.s4() +
//     "-" +
//     this.s4() +
//     "-" +
//     this.s4() +
//     "-" +
//     this.s4() +
//     "-" +
//     this.s4() +
//     this.s4() +
//     this.s4() +
//     "-" +
//     Date.now().toString(16)
//   );
// };
// Utilities.s4 = function() {
//   return Math.floor((1 + Math.random()) * 0x10000)
//     .toString(16)
//     .substring(1);
// };
// Utilities.putOnTopLst = function(lst, elementB) {
//   lst.remove_ref(elementB);
//   lst.unshift(elementB);
//   // for (let index = 0; index < lst.length; index++) {
//   //   const element = lst[index];
//   //   if (element.id.get() === elementB.id.get()) {
//   //     lst.remove(index);
//   //   }
//   // }
// };
// export {
//   Utilities
// };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VdGlsaXRpZXMuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsInByb21pc2VMb2FkIiwiU3BpbmFsTm9kZVBvaW50ZXIiLCJwdHIiLCJQdHIiLCJkYXRhIiwidmFsdWUiLCJGaWxlU3lzdGVtIiwiX29iamVjdHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImxvYWQiLCJzNCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwiZ3VpZCIsImNvbnN0cnVjdG9yIiwiRGF0ZSIsIm5vdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUVBLFNBQVNFLFdBQVQsQ0FBcUJDLGlCQUFyQixFQUF3QztBQUNwQyxNQUNJQSxpQkFBaUIsQ0FBQ0MsR0FBbEIsWUFBaUNMLFVBQVUsQ0FBQ00sR0FBNUMsSUFDQUYsaUJBQWlCLENBQUNDLEdBQWxCLENBQXNCRSxJQUF0QixDQUEyQkMsS0FBM0IsS0FBcUMsQ0FEckMsSUFFQSxPQUFPQyxVQUFVLENBQUNDLFFBQVgsQ0FBb0JOLGlCQUFpQixDQUFDQyxHQUFsQixDQUFzQkUsSUFBdEIsQ0FBMkJDLEtBQS9DLENBQVAsS0FBaUUsV0FIckUsRUFLSSxPQUFPRyxPQUFPLENBQUNDLE9BQVIsQ0FBZ0JILFVBQVUsQ0FBQ0MsUUFBWCxDQUFvQk4saUJBQWlCLENBQUNDLEdBQWxCLENBQXNCRSxJQUF0QixDQUEyQkMsS0FBL0MsQ0FBaEIsQ0FBUCxDQUxKLEtBT0ksT0FBTyxJQUFJRyxPQUFKLENBQVlDLE9BQU8sSUFBSTtBQUMxQlIsSUFBQUEsaUJBQWlCLENBQUNDLEdBQWxCLENBQXNCUSxJQUF0QixDQUEyQkQsT0FBM0I7QUFDSCxHQUZNLENBQVA7QUFHUDs7QUFFRCxTQUFTRSxFQUFULEdBQWM7QUFDVixTQUFPQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDLElBQUlELElBQUksQ0FBQ0UsTUFBTCxFQUFMLElBQXNCLE9BQWpDLEVBQ0ZDLFFBREUsQ0FDTyxFQURQLEVBRUZDLFNBRkUsQ0FFUSxDQUZSLENBQVA7QUFHSDs7QUFFRCxTQUFTQyxJQUFULENBQWNDLFdBQWQsRUFBMkI7QUFDdkIsU0FDSUEsV0FBVyxHQUFHLEdBQWQsR0FBb0JQLEVBQUUsRUFBdEIsR0FBMkJBLEVBQUUsRUFBN0IsR0FBa0MsR0FBbEMsR0FBd0NBLEVBQUUsRUFBMUMsR0FBK0MsR0FBL0MsR0FBcURBLEVBQUUsRUFBdkQsR0FBNEQsR0FBNUQsR0FDQUEsRUFBRSxFQURGLEdBQ08sR0FEUCxHQUNhQSxFQUFFLEVBRGYsR0FDb0JBLEVBQUUsRUFEdEIsR0FDMkJBLEVBQUUsRUFEN0IsR0FDa0MsR0FEbEMsR0FDd0NRLElBQUksQ0FBQ0MsR0FBTCxHQUFXTCxRQUFYLENBQW9CLEVBQXBCLENBRjVDO0FBSUgsQyxDQThCRDtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmZ1bmN0aW9uIHByb21pc2VMb2FkKFNwaW5hbE5vZGVQb2ludGVyKSB7XG4gICAgaWYgKFxuICAgICAgICBTcGluYWxOb2RlUG9pbnRlci5wdHIgaW5zdGFuY2VvZiBnbG9iYWxUeXBlLlB0ciAmJlxuICAgICAgICBTcGluYWxOb2RlUG9pbnRlci5wdHIuZGF0YS52YWx1ZSAhPT0gMCAmJlxuICAgICAgICB0eXBlb2YgRmlsZVN5c3RlbS5fb2JqZWN0c1tTcGluYWxOb2RlUG9pbnRlci5wdHIuZGF0YS52YWx1ZV0gIT09IFwidW5kZWZpbmVkXCJcbiAgICApXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoRmlsZVN5c3RlbS5fb2JqZWN0c1tTcGluYWxOb2RlUG9pbnRlci5wdHIuZGF0YS52YWx1ZV0pO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgU3BpbmFsTm9kZVBvaW50ZXIucHRyLmxvYWQocmVzb2x2ZSk7XG4gICAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzNCgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAuc3Vic3RyaW5nKDEpO1xufVxuXG5mdW5jdGlvbiBndWlkKGNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgY29uc3RydWN0b3IgKyBcIi1cIiArIHM0KCkgKyBzNCgpICsgXCItXCIgKyBzNCgpICsgXCItXCIgKyBzNCgpICsgXCItXCIgK1xuICAgICAgICBzNCgpICsgXCItXCIgKyBzNCgpICsgczQoKSArIHM0KCkgKyBcIi1cIiArIERhdGUubm93KCkudG9TdHJpbmcoMTYpXG4gICAgKTtcbn1cblxuZXhwb3J0IHtcbiAgICBwcm9taXNlTG9hZCxcbiAgICBndWlkXG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4vLyBsZXQgVXRpbGl0aWVzID0ge307XG4vLyBjb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuLy8gVXRpbGl0aWVzLmdldFZpZXdlciA9IGZ1bmN0aW9uKCkge1xuLy8gICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuLy8gICAgIGlmIChnbG9iYWxUeXBlLnYgPT09IFwidW5kZWZpbmVkXCIpIHtcbi8vICAgICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbi8vICAgICAgICAgaWYgKGdsb2JhbFR5cGUudiAhPT0gXCJ1bmRlZmluZWRcIikge1xuLy8gICAgICAgICAgIHJlc29sdmUoZ2xvYmFsVHlwZS52KTtcbi8vICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSwgNTAwKTtcbi8vICAgICB9IGVsc2UgcmVzb2x2ZShnbG9iYWxUeXBlLnYpO1xuLy8gICB9KTtcbi8vIH07XG5cbi8vIFV0aWxpdGllcy5wcm9taXNlR2V0UHJvcGVydGllcyA9IGZ1bmN0aW9uKF9kYklkKSB7XG4vLyAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbi8vICAgICBVdGlsaXRpZXMuZ2V0Vmlld2VyKCkudGhlbih2aWV3ZXIgPT4ge1xuLy8gICAgICAgdmlld2VyLmdldFByb3BlcnRpZXMoX2RiSWQsIHJlc29sdmUpO1xuLy8gICAgIH0pO1xuLy8gICB9KTtcbi8vIH07XG5cbi8vIFV0aWxpdGllcy5wcm9taXNlR2V0RXh0ZXJuYWxJZE1hcHBpbmcgPSBmdW5jdGlvbihfZXh0ZXJuYWxJZCkge1xuLy8gICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4vLyAgICAgVXRpbGl0aWVzLmdldFZpZXdlcigpLnRoZW4odmlld2VyID0+IHtcbi8vICAgICAgIHZpZXdlci5tb2RlbC5nZXRFeHRlcm5hbElkTWFwcGluZyhyZXMgPT4ge1xuLy8gICAgICAgICByZXNvbHZlKHJlc1tfZXh0ZXJuYWxJZF0pO1xuLy8gICAgICAgfSk7XG4vLyAgICAgfSk7XG4vLyAgIH0pO1xuXG4vLyB9XG5cblxuLy8gLy8gVXRpbGl0aWVzLnByb21pc2VMb2FkID0gZnVuY3Rpb24oX3B0cikge1xuLy8gLy8gICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4vLyAvLyAgICAgX3B0ci5sb2FkKHJlc29sdmUpO1xuLy8gLy8gICB9KTtcbi8vIC8vIH1cbi8vIFV0aWxpdGllcy5wcm9taXNlTG9hZCA9IGZ1bmN0aW9uKF9wdHIpIHtcbi8vICAgaWYgKFxuLy8gICAgIF9wdHIgaW5zdGFuY2VvZiBnbG9iYWxUeXBlLlB0ciAmJlxuLy8gICAgIF9wdHIuZGF0YS52YWx1ZSAhPSAwICYmXG4vLyAgICAgdHlwZW9mIEZpbGVTeXN0ZW0uX29iamVjdHNbX3B0ci5kYXRhLnZhbHVlXSAhPSBcInVuZGVmaW5lZFwiXG4vLyAgIClcbi8vICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEZpbGVTeXN0ZW0uX29iamVjdHNbX3B0ci5kYXRhLnZhbHVlXSk7XG4vLyAgIGVsc2Vcbi8vICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4vLyAgICAgICBfcHRyLmxvYWQocmVzb2x2ZSk7XG4vLyAgICAgfSk7XG4vLyB9O1xuXG5cblxuXG4vLyBVdGlsaXRpZXMuZ2V0RXh0ZXJuYWxJZCA9IGFzeW5jIGZ1bmN0aW9uKF9kYklkKSB7XG4vLyAgIGxldCBwcm9wZXJ0aWVzID0gYXdhaXQgVXRpbGl0aWVzLnByb21pc2VHZXRQcm9wZXJ0aWVzKF9kYklkKTtcbi8vICAgcmV0dXJuIHByb3BlcnRpZXMuZXh0ZXJuYWxJZDtcbi8vIH07XG5cbi8vIFV0aWxpdGllcy5nZXREYklkQnlFeHRlcm5hbElkID0gYXN5bmMgZnVuY3Rpb24oX2V4dGVybmFsSWQpIHtcbi8vICAgbGV0IGRiaWQgPSBhd2FpdCBVdGlsaXRpZXMucHJvbWlzZUdldEV4dGVybmFsSWRNYXBwaW5nKF9leHRlcm5hbElkKTtcbi8vICAgcmV0dXJuIGRiaWQ7XG4vLyB9O1xuXG4vLyBVdGlsaXRpZXMuYXJyYXlzRXF1YWwgPSBmdW5jdGlvbihhcnJheUEsIGFycmF5Qikge1xuLy8gICBpZiAoYXJyYXlBID09PSBhcnJheUIpIHJldHVybiB0cnVlO1xuLy8gICBpZiAoYXJyYXlBID09IG51bGwgfHwgYXJyYXlCID09IG51bGwpIHJldHVybiBmYWxzZTtcbi8vICAgaWYgKGFycmF5QS5sZW5ndGggIT0gYXJyYXlCLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuLy8gICBhcnJheUEuc29ydCgpO1xuLy8gICBhcnJheUIuc29ydCgpO1xuLy8gICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5QS5sZW5ndGg7ICsraSkge1xuLy8gICAgIGlmIChhcnJheUFbaV0gIT09IGFycmF5QltpXSkgcmV0dXJuIGZhbHNlO1xuLy8gICB9XG4vLyAgIHJldHVybiB0cnVlO1xuLy8gfTtcblxuLy8gVXRpbGl0aWVzLmNvbnRhaW5zTHN0QnlJZCA9IGZ1bmN0aW9uKF9saXN0LCBfbm9kZSkge1xuLy8gICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2xpc3QubGVuZ3RoOyBpbmRleCsrKSB7XG4vLyAgICAgY29uc3QgZWxlbWVudCA9IF9saXN0W2luZGV4XTtcbi8vICAgICBpZiAoZWxlbWVudC5pZC5nZXQoKSA9PSBfbm9kZS5pZC5nZXQoKSkgcmV0dXJuIHRydWU7XG4vLyAgIH1cbi8vICAgcmV0dXJuIGZhbHNlO1xuLy8gfTtcblxuLy8gVXRpbGl0aWVzLmNvbnRhaW5zTHN0TW9kZWwgPSBmdW5jdGlvbihfbGlzdCwgX21vZGVsKSB7XG4vLyAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbGlzdC5sZW5ndGg7IGluZGV4KyspIHtcbi8vICAgICBjb25zdCBlbGVtZW50ID0gX2xpc3RbaW5kZXhdO1xuLy8gICAgIGlmIChlbGVtZW50LmdldCgpID09IF9tb2RlbC5nZXQoKSkgcmV0dXJuIHRydWU7XG4vLyAgIH1cbi8vICAgcmV0dXJuIGZhbHNlO1xuLy8gfTtcblxuLy8gVXRpbGl0aWVzLmNvbnRhaW5zTHN0ID0gZnVuY3Rpb24oX2xpc3QsIF9lbGVtZW50KSB7XG4vLyAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbGlzdC5sZW5ndGg7IGluZGV4KyspIHtcbi8vICAgICBjb25zdCBlbGVtZW50ID0gX2xpc3RbaW5kZXhdO1xuLy8gICAgIGlmIChlbGVtZW50LmdldCgpID09IF9lbGVtZW50KSByZXR1cm4gdHJ1ZTtcbi8vICAgfVxuLy8gICByZXR1cm4gZmFsc2U7XG4vLyB9O1xuXG4vLyBVdGlsaXRpZXMuaW5jbHVkZSA9IGZ1bmN0aW9uKGFyciwgb2JqKSB7XG4vLyAgIHJldHVybiBhcnIuaW5kZXhPZihvYmopICE9IC0xO1xuLy8gfTtcblxuLy8gVXRpbGl0aWVzLmdldEluZGV4ID0gZnVuY3Rpb24oYXJyLCBvYmopIHtcbi8vICAgcmV0dXJuIGFyci5pbmRleE9mKG9iaik7XG4vLyB9O1xuXG4vLyBVdGlsaXRpZXMuZ2V0SWRzID0gZnVuY3Rpb24oYXJyYXkpIHtcbi8vICAgbGV0IHJlcyA9IFtdO1xuLy8gICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4vLyAgICAgcmVzLnB1c2goYXJyYXlbaW5kZXhdLmlkLmdldCgpKTtcbi8vICAgfVxuLy8gICByZXR1cm4gcmVzO1xuLy8gfTtcbi8vIC8vIFV0aWxpdGllcy5hZGROb3RFeGlzdGluZyA9IGZ1bmN0aW9uKGFyciwgb2JqKSB7XG4vLyAvLyAgIHJldHVybiAoYXJyLmluZGV4T2Yob2JqKSk7XG4vLyAvLyB9XG5cbi8vIFV0aWxpdGllcy5jb25jYXQgPSBmdW5jdGlvbihsaXN0QSwgbGlzdEIpIHtcbi8vICAgbGV0IHJlcyA9IFtdO1xuLy8gICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGlzdEEubGVuZ3RoOyBpbmRleCsrKSB7XG4vLyAgICAgcmVzLnB1c2gobGlzdEFbaW5kZXhdKTtcbi8vICAgfVxuLy8gICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGlzdEIubGVuZ3RoOyBpbmRleCsrKSB7XG4vLyAgICAgcmVzLnB1c2gobGlzdEJbaW5kZXhdKTtcbi8vICAgfVxuLy8gICByZXR1cm4gcmVzO1xuLy8gfTtcblxuLy8gVXRpbGl0aWVzLmFsbEJ1dE1lQnlJZCA9IGZ1bmN0aW9uKF9saXN0LCBfbm9kZSkge1xuLy8gICBsZXQgcmVzID0gW107XG4vLyAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbGlzdC5sZW5ndGg7IGluZGV4KyspIHtcbi8vICAgICBjb25zdCBub2RlID0gX2xpc3RbaW5kZXhdO1xuLy8gICAgIGlmIChub2RlLmlkLmdldCgpICE9IF9ub2RlLmlkLmdldCgpKSB7XG4vLyAgICAgICByZXMucHVzaChub2RlKTtcbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIHJlcztcbi8vICAgfVxuLy8gfTtcblxuLy8gVXRpbGl0aWVzLmd1aWQgPSBmdW5jdGlvbihfY29uc3RydWN0b3IpIHtcbi8vICAgcmV0dXJuIChcbi8vICAgICBfY29uc3RydWN0b3IgK1xuLy8gICAgIFwiLVwiICtcbi8vICAgICB0aGlzLnM0KCkgK1xuLy8gICAgIHRoaXMuczQoKSArXG4vLyAgICAgXCItXCIgK1xuLy8gICAgIHRoaXMuczQoKSArXG4vLyAgICAgXCItXCIgK1xuLy8gICAgIHRoaXMuczQoKSArXG4vLyAgICAgXCItXCIgK1xuLy8gICAgIHRoaXMuczQoKSArXG4vLyAgICAgXCItXCIgK1xuLy8gICAgIHRoaXMuczQoKSArXG4vLyAgICAgdGhpcy5zNCgpICtcbi8vICAgICB0aGlzLnM0KCkgK1xuLy8gICAgIFwiLVwiICtcbi8vICAgICBEYXRlLm5vdygpLnRvU3RyaW5nKDE2KVxuLy8gICApO1xuLy8gfTtcblxuLy8gVXRpbGl0aWVzLnM0ID0gZnVuY3Rpb24oKSB7XG4vLyAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuLy8gICAgIC50b1N0cmluZygxNilcbi8vICAgICAuc3Vic3RyaW5nKDEpO1xuLy8gfTtcblxuLy8gVXRpbGl0aWVzLnB1dE9uVG9wTHN0ID0gZnVuY3Rpb24obHN0LCBlbGVtZW50Qikge1xuLy8gICBsc3QucmVtb3ZlX3JlZihlbGVtZW50Qik7XG4vLyAgIGxzdC51bnNoaWZ0KGVsZW1lbnRCKTtcbi8vICAgLy8gZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxzdC5sZW5ndGg7IGluZGV4KyspIHtcbi8vICAgLy8gICBjb25zdCBlbGVtZW50ID0gbHN0W2luZGV4XTtcbi8vICAgLy8gICBpZiAoZWxlbWVudC5pZC5nZXQoKSA9PT0gZWxlbWVudEIuaWQuZ2V0KCkpIHtcbi8vICAgLy8gICAgIGxzdC5yZW1vdmUoaW5kZXgpO1xuLy8gICAvLyAgIH1cblxuLy8gICAvLyB9XG4vLyB9O1xuXG4vLyBleHBvcnQge1xuLy8gICBVdGlsaXRpZXNcbi8vIH07Il19