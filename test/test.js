new Test().add([
        testMappedArray,
    ]).run()
      .worker(function(err, test) {
        if (!err && typeof testMappedArray_ !== "undefined") {
            testMappedArray = testMappedArray_;
            new Test(test).run().worker();
        }
    });

function testMappedArray(next) {
    function callback(err,      // err = null,
                      buffer) { // buffer = []

        if (err === null && buffer.get().join() === "") {
            console.log("testMappedArray ok");
            next && next.pass();
        } else {
            console.error("testMappedArray ng");
            next && next.miss();
        }
    }

    var ma = new MappedArray();

    // ---------------------------------------
    // MappedArray#get
    // MappedArray#set
    // MappedArray#push
    // MappedArray#clear
    // MappedArray#clone
    // MappedArray#arraynize
    // MappedArray#objectize
    ma.push(1).push(1).set("key", "value1").set("key", "value2");

    if (ma.arraynize().join() === "1,1" &&
        ma.objectize().key === "value2" &&
        ma.get().key === "value2" &&
        ma.clone().join() === ma.get().join()) {

        ma.clear();
        ma.push( [ 2, [3, 4], [5, 6] ] );

        if (ma.flatten().join() === "2,3,4,5,6") {
            console.log("testMappedArray ok");
            next && next.pass();
            return;
        }
    }
    console.error("testMappedArray ng");
    next && next.miss();
}

