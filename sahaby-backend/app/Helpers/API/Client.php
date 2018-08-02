<?php

namespace App\Helpers\API;

class Client
{

    public static function validateClientInputs($clientId, $clientSecret)
    {
        $client = self::getActiveClient();

        return ($client != null)
               && (!empty($clientId))
               && (!empty($clientSecret))
               && ($clientId == $client->id)
               && ($clientSecret == $client->secret);
    }

    public static function getActiveClient()
    {
        $clientId = config('auth.client_id');
        $clientSecret = config('auth.client_secret');

        return (object) [
            'id' => $clientId,
            'secret' => $clientSecret
        ];
    }

    /**
     * @param int $statusCode status code
     * @param string $message Optional error message or message on success
     * @param string | array $data Optional data
     * @param array $extraHeaders
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public static function respond($statusCode, $message = "", $data = [], $extraHeaders = [])
    {
        $data = ($data instanceof Illuminate\Database\Eloquent\Model) ? $data->toArray() : $data;

        $response = [
            "status" => $statusCode,
            "message" => $message,
            "data" => $data
        ];

        return response()->json($response, $statusCode, $extraHeaders, JSON_UNESCAPED_UNICODE);
    }

    /**
     * @param string $message Optional error message or message on success
     * @param string | array $data Optional data
     * @param array $extraHeaders
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public static function respondSuccess($message = "", $data = "", $extraHeaders = [])
    {
        return self::respond(200, $message, $data, $extraHeaders);
    }

    /**
     * @param string $message Optional error message or message on success
     * @param string | array $data Optional data
     * @param array $extraHeaders
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public static function respondError($errorCode = 500, $message = "", $data = "", $extraHeaders = [])
    {
        return self::respond($statusCode, $message, $data, $extraHeaders);
    }
}
