const selas = require("@selas/selas-node");
const functions = require("firebase-functions");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const region = "europe-west1";

const run_config= {timeoutSeconds: 60, memory: "128MB"}


exports.helloWorld = functions.runWith(run_config).region(region).https.onRequest((request, response) => {
  //functions.runWith(run_config).region(region).logger.info("Hello logs!", { structuredData: true });
    return response.send("Hello from Spawn!");
});

exports.getServiceList = functions.runWith(run_config).region(region).https.onRequest(
  async (request, response) => {
    var credentials = {
      app_id: request.body["app_id"],
      key: request.body["key"],
      secret: request.body["secret"],
    };

    if ("app_user_external_id" in request.body)
      credentials["app_user_external_id"] = request.body["app_user_external_id"];

    const client = await selas.createSelasClient(credentials);

    response.set("Content-Type", "application/json");
    try{
      return response.send(await client.getServiceList());
    }
    catch(err){
      response.send(err);
    }
  }
);

exports.getAddOnList = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  var credentials = {
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  };

  if ("app_user_external_id" in request.body)
    credentials["app_user_external_id"] = request.body["app_user_external_id"];

  const client = await selas.createSelasClient(credentials);

  response.set("Content-Type", "application/json");

  try{
    return response.send(await client.getAddOnList());
  }
  catch(err){
    response.send(err);
  }
});

/***************  USER METHODS  ***************/

exports.createAppUser = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  const client = await selas.createSelasClient({
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  });

  response.set("Content-Type", "application/json");

  try{
    return response.send(await client.createAppUser(request.body["app_user_external_id"]));
  }
  catch(err){
    response.send(err);
  }
});

exports.isUser = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  const client = await selas.createSelasClient({
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  });

  response.set("Content-Type", "application/json");

  try{
    return response.send(await client.isUser(request.body["app_user_external_id"]));
  }
  catch(err){
    response.send(err);
  }
});

exports.createToken = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  const client = await selas.createSelasClient({
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  });

  response.set("Content-Type", "application/json");

  try{
    return response.send(await client.createToken(request.body["app_user_external_id"]));
  }
  catch(err){
    response.send(err);
  }
});

exports.deleteAllTokenOfAppUser = functions.runWith(run_config).region(region).https.onRequest(
  async (request, response) => {
    const client = await selas.createSelasClient({
      app_id: request.body["app_id"],
      key: request.body["key"],
      secret: request.body["secret"],
    });

    response.set("Content-Type", "application/json");

    try{
      return response.send(await client.deleteAllTokenOfAppUser(request.body["app_user_external_id"]));
    }
    catch(err){
      response.send(err);
    }
  }
);

exports.getAppUserToken = functions.runWith(run_config).region(region).https.onRequest(
  async (request, response) => {
    const client = await selas.createSelasClient({
      app_id: request.body["app_id"],
      key: request.body["key"],
      secret: request.body["secret"],
    });

    response.set("Content-Type", "application/json");

    try{
      return response.send(await client.getAppUserToken(request.body["app_user_external_id"]));
    }
    catch(err){
      response.send(err);
    }
  }
);

exports.setCredit = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  const client = await selas.createSelasClient({
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  });

  response.set("Content-Type", "application/json");

  amount = await client.setCredit(request.body["app_user_external_id"], request.body["amount"]);

  try{
    return response.send({amount});
  }
  catch(err){
    response.send(err);
  }
});

exports.getAppUserCredits = functions.runWith(run_config).region(region).https.onRequest(
  async (request, response) => {
    const client = await selas.createSelasClient({
      app_id: request.body["app_id"],
      key: request.body["key"],
      secret: request.body["secret"],
    });

    response.set("Content-Type", "application/json");

    amount = await client.getAppUserCredits(request.body["app_user_external_id"]);
    try{
      return response.send({amount});
    }
    catch(err){
      response.send(err);
    }
  }
);

exports.getAppUserJobHistory = functions.runWith(run_config).region(region).https.onRequest(
  async (request, response) => {
    const client = await selas.createSelasClient({
      app_id: request.body["app_id"],
      key: request.body["key"],
      secret: request.body["secret"],
    });

    response.set("Content-Type", "application/json");
    try{
      return response.send(
        await client.getAppUserJobHistory(
          request.body["app_user_external_id"],
          request.body["p_limit"],
          request.body["p_offset"]
        )
      );
    }
    catch(err){
      response.send(err);
    }
  }
);

/***************  ADD-ONS METHODS  ***************/

exports.shareAddOn = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  const client = await selas.createSelasClient({
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  });

  response.set("Content-Type", "application/json");
  try{
    return response.send(
      await client.shareAddOn(
        request.body["add_on_name"],
        request.body["app_user_external_id"]
      )
    );
  }
  catch(err){
    response.send(err);
  }
});

exports.deleteAddOn = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  const client = await selas.createSelasClient({
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  });

  response.set("Content-Type", "application/json");

  try{
    return response.send(await client.deleteAddOn(request.body["add_on_name"]));
  }
  catch(err){
    response.send(err);
  }  
});

exports.renameAddOn = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  const client = await selas.createSelasClient({
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  });

  response.set("Content-Type", "application/json");

  try{
    return response.send(
      await client.renameAddOn(
        request.body["add_on_name"],
        request.body["new_add_on_name"]
      )
    );
  }
  catch(err){
    response.send(err);
  }  
});

exports.publishAddOn = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  const client = await selas.createSelasClient({
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  });

  response.set("Content-Type", "application/json");

  try{
    return response.send(await client.publishAddOn(request.body["add_on_name"]));
  }
  catch(err){
    response.send(err);
  }  
});

exports.unpublishAddOn = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  const client = await selas.createSelasClient({
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  });

  response.set("Content-Type", "application/json");

  try{
    return response.send(
      await client.unpublishAddOn(request.body["add_on_name"])
    );
  }
  catch(err){
    response.send(err);
  }  
});

/***************  JOB METHODS  ***************/

exports.getResult = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  const client = await selas.createSelasClient({
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  });

  response.set("Content-Type", "application/json");
  try{
    return response.send(await client.getResult(request.body["job_id"]));
  }
  catch(err){
    response.send(err);
  }  
});

exports.costStableDiffusion = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  var credentials = {
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  };

  if ("app_user_external_id" in request.body)
    credentials["app_user_external_id"] =
      request.body["app_user_external_id"];

  const client = await selas.createSelasClient(credentials);

  response.set("Content-Type", "application/json");
  try{
    const cost = await client.costStableDiffusion(
      request.body["prompt"],
      request.body
    );
    return response.send({ cost });
  }
  catch(err){
    response.send(err);
  }  
});

exports.runStableDiffusion = functions.runWith(run_config).region(region).https.onRequest(
  async (request, response) => {
    var credentials = {
      app_id: request.body["app_id"],
      key: request.body["key"],
      secret: request.body["secret"],
    };

    if ("app_user_external_id" in request.body)
      credentials["app_user_external_id"] =
        request.body["app_user_external_id"];

    const client = await selas.createSelasClient(credentials);

    response.set("Content-Type", "application/json");

    function my_callback(feedback) {
      if ("result" in feedback) {
        return response.send(feedback.result);
      }
    }

    var param = request.body;
    param["callback"] = my_callback;

    try{
      await client.runStableDiffusion(request.body["prompt"], param);
    }
    catch(err){
      response.send(err);
    } 

  }
);

exports.costPatchTrainer = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  var credentials = {
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  };

  if ("app_user_external_id" in request.body)
    credentials["app_user_external_id"] =
      request.body["app_user_external_id"];

  const client = await selas.createSelasClient(credentials);

  response.set("Content-Type", "application/json");

  try{
    const cost = await client.costPatchTrainer(
      request.body["dataset"],
      request.body["patch_name"],
      request.body
    );

    return response.send({ cost });
  }
  catch(err){
    response.send(err);
  } 
});

exports.runPatchTrainer = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  var credentials = {
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  };

  if ("app_user_external_id" in request.body)
    credentials["app_user_external_id"] =
      request.body["app_user_external_id"];

  const client = await selas.createSelasClient(credentials);

  response.set("Content-Type", "application/json");

  function my_callback(feedback) {
    if ("result" in feedback) {
      return response.send(feedback.result);
    }
  }

  var param = request.body;
  param["callback"] = my_callback;

  try{
    return response.send(
      await client.runPatchTrainer(
        request.body["dataset"],
        request.body["patch_name"],
        param
      )
    );
  }
  catch(err){
    response.send(err);
  } 
});

exports.getCountActiveWorker = functions.runWith(run_config).region(region).https.onRequest(async (request, response) => {
  const client = await selas.createSelasClient({
    app_id: request.body["app_id"],
    key: request.body["key"],
    secret: request.body["secret"],
  });

  response.set("Content-Type", "application/json");

  try{
    const count = await client.getCountActiveWorker();

    return response.send({ count });
  }
  catch(err){
    response.send(err);
  } 
});
