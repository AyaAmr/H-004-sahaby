<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMemberLanguageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('member_language', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('language_id')->unsigned()->nullable()->default(null);
            $table->foreign('language_id')
                  ->references('id')
                  ->on('languages')
                  ->onDelete('cascade');
            $table->integer('member_id')->unsigned()->nullable()->default(null);
            $table->string('member_type')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('member_language');
    }
}
