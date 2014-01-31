// @name: MappedArray.js

(function(global) {

// --- variable --------------------------------------------
var _inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function MappedArray(mappedArray) { // @arg MappedArray(= null): copy constructor.
                                    // @help: MappedArray
                                    // @desc: MappedArray is Object(map) + Array container.
    this._ = mappedArray ? mappedArray.clone()
                         : [];
}
MappedArray["name"] = "MappedArray";
MappedArray["repository"] = "https://github.com/uupaa/MappedArray.js/";
MappedArray["prototype"] = {
    "constructor":  MappedArray,
    "valueOf":      MappedArray_get,      // MappedArray#get():Array
    "get":          MappedArray_get,      // MappedArray#get():Array
    "set":          MappedArray_set,      // MappedArray#set(key:String, value:Any):this
    "push":         MappedArray_push,     // MappedArray#push(value:Any):this
    "clear":        MappedArray_clear,    // MappedArray#clear():this
    "clone":        MappedArray_clone,    // MappedArray#clone():Array
    "flatten":      MappedArray_flatten,  // MappedArray#flatten():Array
    "arraynize":    MappedArray_arraynize,// MappedArray#arraynize():Array
    "objectize":    MappedArray_objectize // MappedArray#objectize():Object
};

// --- implement -------------------------------------------
function MappedArray_get() { // @ret Array: buffer array.
                             // @help: MappedArray#get
    return this._;
}

function MappedArray_set(key,     // @arg String:
                         value) { // @arg Any:
                                  // @help: MappedArray#set
    this._[key] = value;
    return this;
}

function MappedArray_push(value) { // @arg Any:
                                   // @ret this:
                                   // @help: MappedArray#push
    this._.push(value);
    return this;
}

function MappedArray_clear() { // @ret this:
                               // @help: MappedArray#clear
    this._ = [];
    return this;
}

function MappedArray_clone() { // @ret Array:
    var _ = this._;

    return Object.keys(_).reduce(function(result, key) {
        result[key] = _[key];
        return result;
    }, []);
}

function MappedArray_flatten() { // @ret Array:
                                 // @help: MappedArray#flatten
    return Array.prototype.concat.apply([], this._);
}

function MappedArray_arraynize() { // @ret Array:
                                   // @help: MappedArray#arraynize
    return Array.prototype.slice.call(this._);
}

function MappedArray_objectize() { // @ret Object:
                                   // @help: MappedArray#objectize
    var _ = this._;

    return Object.keys(_).reduce(function(result, key) {
        result[key] = _[key];
        return result;
    }, {});
}

// --- export ----------------------------------------------
//{@node
if (_inNode) {
    module["exports"] = MappedArray;
}
//}@node
global["MappedArray"] ? (global["MappedArray_"] = MappedArray) // already exsists
                      : (global["MappedArray"]  = MappedArray);

})(this.self || global);

