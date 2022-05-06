public String Json2Csv(String json) throws JSONException {
    JSONArray jsonArray = new JSONArray(json);
    String csv =CDL.toString(jsonArray);  
    return csv;	
}