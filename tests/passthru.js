var test = require('tape'),
    optimist = require('optimist'),
    pass = require('../passthru');


function noop() {}

test('run', function(t) {
    t.plan(2);

    function mock(args, opts, cb) {
        t.equal(args[0], 'jslint');
        t.same(options, opts);
    }

    var options = {
            picnic: true,
            baskets: 3,
            cliMock: {
                run: mock
            }
        };
    
	pass.run('jslint', ['hey booboo'], options, noop);
});

test('run', function(t) {
    var ok = pass.isMojitoApp('');
    t.notOk(ok);
    t.end();
});