var vows = require("vows"),
	assert = require("assert"),
	gitteh = require("gitteh"),
	path = require("path"),
	fixtureValues = require("./fixtures/values");

var repo = new gitteh.Repository(fixtureValues.REPO_PATH);
vows.describe("References").addBatch({
	"Getting HEAD ref": {
		topic: repo.getReference("HEAD"),
		
		"gives us a reference": function(ref) {
			assert.isTrue(!!ref);
		},
		
		"name is correct": function(ref) {
			assert.equal(ref.name, "HEAD");
		},
		
		"- then resolving it": {
			topic: function(ref) {
				return ref.resolve();
			},
			
			"gives us a ref": function(ref) {
				assert.isTrue(!!ref);
			},
			
			"gives us a non-symbolic ref": function(ref) {
				assert.equal(ref.type, gitteh.GIT_REF_OID);
			},
			
			"gives us the ref pointing to latest commit": function(ref) {
				assert.equal(ref.target, fixtureValues.LATEST_COMMIT.id);
			}
		}
	},
	
	"Creating a symbolic ref": {
		topic: repo.createSymbolicReference("heads/test", "heads/master"),
		
		"gives us a reference": function(ref) {
			assert.isTrue(!!ref);
		},
		
		"with correct name": function(ref) {
			assert(ref.name, "heads/test");
		},
		
		"and correct type": function(ref) {
			assert(ref.type, gitteh.GIT_REF_SYMBOLIC);
		},
		
		"ref is reachable from repository": function(ref) {
			assert.isTrue(ref === repo.getReference("heads/test"));
		}
	}
}).export(module);
