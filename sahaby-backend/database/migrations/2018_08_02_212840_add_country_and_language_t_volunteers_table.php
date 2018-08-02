<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCountryAndLanguageTVolunteersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('volunteers', function (Blueprint $table) {
            $table->dropColumn('preferred_gender');
            $table->dropColumn('verfication_code');
            $table->string('password')->nullable();
            $table->integer('language_id')->unsigned()->nullable()->default(null);
            $table->foreign('language_id')
                  ->references('id')
                  ->on('languages')
                  ->onDelete('cascade');
            $table->integer('country_id')->unsigned()->nullable()->default(null);
            $table->foreign('country_id')
                  ->references('id')
                  ->on('languages')
                  ->onDelete('cascade');
            $table->string('image_name')->nullable();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
