<?php

namespace App\Enums;
use App;

/**
 * Class Enum.
 *
 * @package namespace App\Enums;
 */
abstract class Enum {
    private static $constCacheArray = NULL;

    public static function getConstants() {
        if (self::$constCacheArray === null) self::$constCacheArray = array();

        $calledClass = get_called_class();
        if (!array_key_exists($calledClass, self::$constCacheArray)) {
            $reflect = new \ReflectionClass($calledClass);
            self::$constCacheArray[$calledClass] = $reflect->getConstants();
        }

        return self::$constCacheArray[$calledClass];
    }

    public static function isValidName($name, $strict = false) {
        $constants = self::getConstants();

        if ($strict) {
            return array_key_exists($name, $constants);
        }

        $keys = array_map('strtolower', array_keys($constants));
        return in_array(strtolower($name), $keys);
    }

    public static function isValidValue($value, $strict = true) {
        $values = array_values(self::getConstants());
        return in_array($value, $values, $strict);
    }

    public static function getConstantsForDropDown(array $options = [])
    {
        $constants = array_flip(self::getConstants());

        if(array_key_exists('translate', $options) && array_key_exists('translate_file', $options)) {
            if($options['translate']) {
                $ret = [];
                foreach ($constants as $key => $value) {
                    $ret[$key] = __($options['translate_file'] . '.' . $value);
                }

                return $ret;
            }
        }

        return $constants;
    }


    public static function getConstantsWithTranslations(array $options = [])
    {

        $locale = App::getLocale();
        App::setLocale('ar');
        $arData = self::getConstantsForDropDown($options);
        App::setLocale('en');
        $enData = self::getConstantsForDropDown($options);
        App::setLocale($locale);
        $constants = [];
        if($locale === 'ar') {
            foreach ($arData as $key => $value) {
                $constants[] = [
                    'id' => $key,
                    'name' => $value,
                    'translations' => [
                        [
                            'id' => $key,
                            'name' => $value,
                            'locale' => 'ar'
                        ],
                        [
                            'id' => $key,
                            'name' => $enData[$key],
                            'locale' => 'en'
                        ],

                    ]
                ];
            }
        }

        if($locale === 'en') {
            foreach ($enData as $key => $value) {
                $constants[] = [
                    'id' => $key,
                    'name' => $value,
                    'translations' => [
                        [
                            'id' => $key,
                            'name' => $value,
                            'locale' => 'en'
                        ],
                        [
                            'id' => $key,
                            'name' => $arData[$key],
                            'locale' => 'ar'
                        ],

                    ]
                ];
            }

        }
        return $constants;
    }
}
